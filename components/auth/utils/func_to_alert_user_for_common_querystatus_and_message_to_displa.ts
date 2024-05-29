import { Alert } from "react-native";

export  function alert_user_for_common__errors_from_backend_given_by_Rquery(data) {
    // console.log("{{}}}}}--==",data);
    if (data === undefined || data === null || data.body.status_code === null || data.body.status_code === undefined ){
        console.log("\n\n-------------------data is null in the func alert_user_for_common__errors_from_backend_given_by_Rquery-----------null--------------------------",data,"\n\n");
        
        return 
    }
    if (!data){
        
        console.log("\n\n-------------------data is not here and this is not happening, in the func alert_user_for_common__errors_from_backend_given_by_Rquery-----------null--------------------------\n\n");
        
        return
    }
    
    console.log("hopefully read ++\n\n --data-->>",data);
    if (data.body.status_code ===200 || data.body.status_code ===201 ){        
        return
    }
    console.log("\n\n data from the alert_user_for_common__errors_from_backend_given_by_Rquery--->>>",data);
    // return data
   if (String(data.body.message_for_the_user).length > 2) {
     if (data.body.status_code >= 500) {
         Alert.alert("Something went wrong on our side", data.body.message_for_the_user);
     } else {
         Alert.alert("Something went wrong", data.body.message_for_the_user);
     }
   }
    
}