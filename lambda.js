const AWS = require('aws-sdk');

const s3Bucket = 'your-s3-bucket-name';
const csvFileName = 'registrations.csv';

const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    try {
        const formData = JSON.parse(event.body);

        // Validate form data (add your validation logic here if needed)

        const csvData = `${formData.companyName},${formData.contactPerson},${formData.contactPhone},${formData.contactEmail}\n`;

        const params = {
            Bucket: s3Bucket,
            Key: csvFileName,
            Body: csvData,
            ContentType: 'text/csv',
            ACL: 'public-read'
        };

        await s3.putObject(params).promise();

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
