   let myheaders = {
      "username": "demo",
      "password": "metropolis01"
    }

    fetch('http://www.makitti.com:81/syscor/api/vehicle/65071/vin', {
      method: "GET",
      headers: {
      'Authorization': 'Basic ZGVtbzptZXRyb3BvbGlzMDE=' +
    }
    }).then(function(response) {
      console.log(response); 
     
    }, function(error) {
      console.log(error.message); //=> String
    })