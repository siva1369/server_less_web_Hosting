$(document).ready(function () {
  // Intercept the form submission
  $('form').submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form data
    const formData = {
      companyName: $('input[name=companyName]').val(),
      contactPerson: $('input[name=contactPerson]').val(),
      contactPhone: $('input[name=contactPhone]').val(),
      contactEmail: $('input[name=contactEmail]').val(),
    };

    // Send form data to the Lambda function using AJAX
    $.ajax({
      type: 'POST',
      url: 'https://e42hslulbh.execute-api.ap-south-1.amazonaws.com/lambda', // Replace with your actual API Gateway endpoint
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function (response) {
        // Display a success message to the user
        $('#alert').html('<div class="alert alert-success" role="alert">Registration successful!</div>');
        // Optionally, clear the form fields after successful registration
        $('form')[0].reset();
      },
      error: function (error) {
        // Display an error message to the user
        $('#alert').html('<div class="alert alert-danger" role="alert">Registration failed. Please try again later.</div>');
      },
    });
  });
});



