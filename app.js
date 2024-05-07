const express = require('express');
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const app = express();

// Azure Key Vault details
const keyVaultName = 'project4az';
const vaultUrl = `https://${keyVaultName}.vault.azure.net`;

// Azure AD details
const tenantId = 'bf4a0561-a67c-4f99-99d6-4126cc81f773';
const clientId = '84f99cf1-aae6-4740-ac36-41fbc254d0ad';
const clientSecret = 'HaB8Q~-kHCMHFLFdDvExo9bfRK6nlAqg~iQCeaHx';

// Create a SecretClient instance
const credential = new DefaultAzureCredential({
    tenantId,
    clientId,
    clientSecret
});

const client = new SecretClient(vaultUrl, credential);

// Route to retrieve sensitive information from Azure Key Vault and display in terminal
app.get('/', async (req, res) => {
    try {
        // Retrieve the secret from Azure Key Vault
        const secretName = 'APIkey';
        const secret = await client.getSecret(secretName);

        // Log the secret value to the terminal
        console.log('Secret value:', secret.value);

        // Send a response to the client
        res.send('Secret value retrieved and displayed in terminal.');
    } catch (err) {
        console.error('Error retrieving secret:', err);
        res.status(500).send('Error retrieving secret from Azure Key Vault');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
