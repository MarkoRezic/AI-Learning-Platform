const mode_types = {
    extractive: {
        name: "EXTRACT",
        text: "Ekstraktivni"
    },
    abstractive: {
        name: "ABSTRACT",
        text: "Apstraktivni"
    },
    multiple_choice: {
        name: "MULTIPLE_CHOICE",
        text: "Više točnih odgovora"
    },
    single_choice: {
        name: "SINGLE_CHOICE",
        text: "Jedan točan odgovor"
    },
    simple: {
        name: "SIMPLE",
        text: "Pojednostavni"
    },
    keywords: {
        name: "KEYWORDS",
        text: "Izvuci ključne riječi"
    },
}

module.exports = mode_types;