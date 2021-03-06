# Read Me Information

[![Build Status](https://dev.azure.com/4252/NextJSDemo/_apis/build/status/icpenguins.nextjsdemo?branchName=master)](https://dev.azure.com/4252/NextJSDemo/_build/latest?definitionId=1&branchName=master)

## VS Code settings.json

The three settings below are to workaround two different bugs. Typically you would use `"jest.showCoverageOnLoad": true` in the VS Code settings file to have Jest run automatically. However, there are cases where it crashes stating that it has failed to start to many times. The setting below resolves that issue.

If you run the Coverage Gutters plug-in, use the settings below to enable setting breakpoints on the gutters of a file.

```json
{
    "jest.pathToJest": "npm run test --",
    "coverage-gutters.showGutterCoverage": false,
    "coverage-gutters.showLineCoverage": true
}
```

## VS Code launch.json

The below settings enable the ability to debug Jest tests and to launch the browser and next instance for debugging.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Next: Chrome",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Next: Node",
            "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/next",
            "env": {
                "NODE_OPTIONS": "--inspect"
            },
            "port": 9229,
            "console": "integratedTerminal"
        },
        {
            "type": "node",
            "name": "vscode-jest-tests",
            "request": "launch",
            "args": [
                "--runInBand"
            ],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "disableOptimisticBPs": true,
            "program": "${workspaceFolder}/node_modules/jest/bin/jest"
        }
    ],
    "compounds": [
        {
            "name": "Next: Full",
            "configurations": ["Next: Node", "Next: Chrome"]
        }
    ]
}
```

## Azure Container Deployment

If you have created a pipeline build or are publishing to an Azure Container Registry, here are some steps to deploying the container.

<https://docs.microsoft.com/en-us/azure/container-instances/container-instances-using-azure-container-registry>

### Create an Azure Key Vault Secret

```bash
RES_GROUP=myresourcegroup # Resource Group name
ACR_NAME=myregistry       # Azure Container Registry registry name
AKV_NAME=mykeyvault       # Azure Key Vault vault name

az keyvault create -g $RES_GROUP -n $AKV_NAME

# Create service principal, store its password in AKV (the registry *password*)
az keyvault secret set \
  --vault-name $AKV_NAME \
  --name $ACR_NAME-pull-pwd \
  --value $(az ad sp create-for-rbac \
                --name http://$ACR_NAME-pull \
                --scopes $(az acr show --name $ACR_NAME --query id --output tsv) \
                --role acrpull \
                --query password \
                --output tsv)

# Store service principal ID in AKV (the registry *username*)
az keyvault secret set \
    --vault-name $AKV_NAME \
    --name $ACR_NAME-pull-usr \
    --value $(az ad sp show --id http://$ACR_NAME-pull --query appId --output tsv)
```

### Create an Azure template parameters files

In the below code, substitute the values used for `ACR_NAME` and `AKV_NAME` in the above script, the subscriptionId, group name, and determine the Azure geo location of the resource group that will be used. Typically, this would be something like `westus2`.

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "containerGroup": {
            "value": "ACR_NAME"
        },
        "containerVersion": {
            "value": "latest"
        },
        "location": {
            "value": "resourcegroup_geolocation"
        },
        "registryServer": {
            "value": "ACR_NAME.azurecr.io"
        },
        "userName": {
            "reference": {
                "keyVault": {
                    "id": "/subscriptions/[subscriptionId]/resourceGroups/[name]/providers/Microsoft.KeyVault/vaults/[AKV_NAME]"
                },
                "secretName": "ACR_NAME-pull-usr"
            }
        },
        "userPassword": {
            "reference": {
                "keyVault": {
                    "id": "/subscriptions/[subscriptionId]/resourceGroups/[name]/providers/Microsoft.KeyVault/vaults/[AKV_NAME]"
                },
                "secretName": "ACR_NAME-pull-pwd"
            }
        }
    }
}
```

### Use the Azure containerTemplate to create an Azure Container Instances group

```bash
az group deployment create \
    -g $RES_GROUP \
    --template-file deploy/azure/containerTemplate.json \
    --parameters parameters.json
```

## Deploy to Amazon Web Services

### Create a Secret using AWS Secret Manager

For security, create a new Azure secret "user name" and "password" as described above. The script could look similar to the below.

```bash
RES_GROUP=myresourcegroup # Resource Group name
ACR_NAME=myregistry       # Azure Container Registry registry name
AKV_NAME=mykeyvault       # Azure Key Vault vault name
SEC_NAME=$ACR_NAME-aws    # The AWS usr/pwd secrets

az keyvault create -g $RES_GROUP -n $AKV_NAME

# Create service principal, store its password in AKV (the registry *password*)
az keyvault secret set \
  --vault-name $AKV_NAME \
  --name $SEC_NAME-pull-pwd \
  --value $(az ad sp create-for-rbac \
                --name http://$SEC_NAME-pull \
                --scopes $(az acr show --name $ACR_NAME --query id --output tsv) \
                --role acrpull \
                --query password \
                --output tsv)

# Store service principal ID in AKV (the registry *username*)
az keyvault secret set \
    --vault-name $AKV_NAME \
    --name $SEC_NAME-pull-usr \
    --value $(az ad sp show --id http://$SEC_NAME-pull --query appId --output tsv)
```

The output could should look something like the below. Find the `"value":` properties. The first one should be the "password" and the second one should be the "user name" that will be provided to the Amazon Secrets Manager.

```json
{
  "attributes": {
    "created": "2019-10-11T17:01:53+00:00",
    "enabled": true,
    "expires": null,
    "notBefore": null,
    "recoveryLevel": "Purgeable",
    "updated": "2019-10-11T17:01:53+00:00"
  },
  "contentType": null,
  "id": "https://[vault].vault.azure.net/secrets/registry]-aws-pull-pwd/{[a-z0-9]+}",
  "kid": null,
  "managed": null,
  "tags": {
    "file-encoding": "utf-8"
  },
  "value": "{guid}"
}
{
  "attributes": {
    "created": "2019-10-11T17:01:56+00:00",
    "enabled": true,
    "expires": null,
    "notBefore": null,
    "recoveryLevel": "Purgeable",
    "updated": "2019-10-11T17:01:56+00:00"
  },
  "contentType": null,
  "id": "https://[vault].vault.azure.net/secrets/[registry]-aws-pull-usr/{[a-z0-9]+}",
  "kid": null,
  "managed": null,
  "tags": {
    "file-encoding": "utf-8"
  },
  "value": "{guid}"
}
```
