var AWS = require('aws-sdk');


exports.handler = async (event,context,callback)=>{
  var dynamodb = new AWS.DynamoDB.DocumentClient();
   let date=new Date();
    if (event.request.userAttributes.sub) {
    var params = {
        TableName:'Employee-kakwp6dl5jh5zppxnopkyllqs4-dev',
        Item: {
            'id': event.request.userAttributes.sub,
            'employee_name':event.userName,
            'employee_id': event.request.userAttributes['custom:employee_Id'],
            'supervisor':  event.request.userAttributes['custom:supervisor'],
            'full_name':  event.request.userAttributes['custom:full_name'],
            'father_name':  event.request.userAttributes['custom:father_name'],
            'cnic':  event.request.userAttributes['custom:cnic'],
            'role': event.request.userAttributes['custom:role'],
            'employee_phone1': event.request.userAttributes.phone_number,
            'employee_phone2': event.request.userAttributes['custom:phone2'] ,
            'employee_pic': event.request.userAttributes['custom:picture'],
            'employee_salary':event.request.userAttributes['custom:salary'],
            'employee_addr':event.request.userAttributes['custom:address'],
            'employee_email':event.request.userAttributes.email ,
            'employee_email':event.request.userAttributes.email ,
            'company':event.request.userAttributes['custom:company'],
            'blood_group':event.request.userAttributes['custom:blood_group'],
            'transport_mode':event.request.userAttributes['custom:transport_mode'],
            'vichel_no':event.request.userAttributes['custom:vichel_no'],
            'dob':event.request.userAttributes['custom:dob'],
            'doj':event.request.userAttributes['custom:doj'],
            'status':event.request.userAttributes['custom:status'],
            'last_degree':event.request.userAttributes['custom:last_degree'],
            'institute':event.request.userAttributes['custom:institute'],
            'end_date':event.request.userAttributes['custom:end_date'],
            '__typename':'Employee',
            'createdAt':date.toISOString(),
            'updatedAt':date.toISOString()
        }
    };

 return new Promise(async(res,rej)=>{
    dynamodb.put(params, function(err, data) {
      if (err) {
        
        console.log("Error", err);
      } else {
            //   console.log('hello');
        console.log("success", data);
             context.done(null,event);

      }
    });  
    //  return context.logStreamName
    // return event;
 });
    }
    else
    {
        // context.done(null,event);
         return context.logStreamName
    }
 

};
