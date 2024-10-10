const AWS = require('aws-sdk');

const s3Bucket = 'testenvironment78945';
const csvFileName = 'data.csv';

const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    try {
        const formData = JSON.parse(event.body);

        // Validate form data (add your validation logic here if needed)

        // Read existing data from S3
        const existingData = await readExistingData();
        
        // Append new data
        const newData = `${formData.companyName},${formData.contactPerson},${formData.contactPhone},${formData.contactEmail}\n`;
        const updatedData = existingData + newData;

        // Upload updated data to S3
        await uploadData(updatedData);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Registration successful' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};

async function readExistingData() {
    const params = {
        Bucket: s3Bucket,
        Key: csvFileName,
    };

    try {
        const response = await s3.getObject(params).promise();
        return response.Body.toString('utf-8');
    } catch (error) {
        // If the file doesn't exist, return an empty string
        if (error.code === 'NoSuchKey') {
            return '';
        } else {
            throw error;
        }
    }
}

async function uploadData(data) {
    const params = {
        Bucket: s3Bucket,
        Key: csvFileName,
        Body: data,
        ContentType: 'text/csv',
        ACL: 'public-read'
    };

    await s3.putObject(params).promise();
}
