function onPageLoad() {
    var contactId = localStorage.getItem("contactId");
    if(contactId !== '') {
        document.getElementById("rev-code").value = contactId;
        localStorage.removeItem('contactId')
    }
}