
export const notification = {
   showNotification: (data, errors = null) => {
     if(errors == null) {
      Vue.notify({
        group: 'main',
        title: data.content.title,
        type: data.content.type,
        text: data.content.text,
        duration: 3000,
        speed: 1000
      });
     }
     else{
       for (let err in errors.error) {
         for (let text in errors.error[err]) {
           data.content.text = errors.error[err][text];
           notification.showNotification({content: data.content});
         }
       }
     }
   }
};
