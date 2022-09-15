const showError = (error) => {
    const errorContainer = document.querySelector(".error")

    errorContainer.innerText = error
}

const getCepWithUrl = () => {
    var params = new URLSearchParams(window.location.search);

    return params.get("cep")
}

const verifyInput = () => {
    return getCepWithUrl().length == 8
}

const provideData = (data) => {
    document.querySelectorAll(".informations div .data").forEach((value) => {
        value.innerText = data[value.classList[1]]
    })
}


const getCepInformations = () => {
    if (!verifyInput()) return showError("CEP inválido")

    $.ajax({
        url: `http://localhost:5050/api/cep-informations/${getCepWithUrl()}`,
        type: "GET",
        success: function (data) {
            if (data.erro) {
                return showError("Cep inválido")
            }
            provideData(data)
        },
        error: function (error) {
            showError("Cep inválido")
        }
    });
}
getCepInformations()