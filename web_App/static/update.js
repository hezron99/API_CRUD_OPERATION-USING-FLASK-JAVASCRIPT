
// UPDATE USING POST
document.addEventListener("DOMContentLoaded", async () =>{
    const form_update = document.getElementById('form_update');
    const username_updt = document.getElementById('username_updt');
    const email_updt = document.getElementById('email_updt');
    const message_updt = document.getElementById('message_updt');
    const userId = parseInt(window.location.pathname.split('/').pop());
    form_update.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const update_user = {
            username: username_updt.value,
            email: email_updt.value
        };
        const response_updt = await fetch(`/update/${userId}`,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(update_user)

        });
        const response_updt_Data = await response_updt.json();
        if (response_updt.status === 200){
            message_updt.textContent = response_updt_Data.message;
            message_updt.style.color = 'green';
            form_update.reset();
        }else{
            message_updt.textContent = response_updt_Data.message;
            message_updt.style.color ='red';
        }

    });
});
