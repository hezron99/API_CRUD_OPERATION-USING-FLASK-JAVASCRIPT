document.addEventListener('DOMContentLoaded', async () =>{
    const DeleteLinks = document.querySelectorAll('.delete-link');

    DeleteLinks.forEach(link => {
        link.addEventListener('click', async (e)=>{
            e.preventDefault();
            const confirmed = window.confirm("Are You sure you want to delete?");
            if (confirmed){
                const deleteUrl = e.target.getAttribute('href');
                const response = await fetch(deleteUrl, {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json'
                    },
                });
                const data = await response.json();
                console.log(data);
                if (response.status === 200){
                    location.reload();
                }
            }
        });
    });
});