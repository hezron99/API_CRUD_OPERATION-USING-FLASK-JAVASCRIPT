// Register POST method
document.addEventListener("DOMContentLoaded", () => {
    const FormRegister = document.getElementById("FormRegister");
    const user_input = document.getElementById("username");
    const email_input = document.getElementById("email");
    const password_input = document.getElementById("password");
    const password_match = document.getElementById("password_match");
    const message = document.getElementById("message");

    FormRegister.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const new_user = {
            username: user_input.value,
            email: email_input.value,
            password: password_input.value,
            password_match: password_match.value
        };
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_user),
        });
        const responseData = await response.json();

        if (response.ok){
            message.textContent = responseData.message;
            message.style.color = 'green';
            message.style.display = 'block';
            FormRegister.reset();
        }else{
            message.textContent = responseData.message;
            message.style.color = 'red';
        }
        
    });
});
