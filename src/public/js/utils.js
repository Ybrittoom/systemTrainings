//formataçao de data
function formatDate(birth_date) {
    return new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date(birth_date));
}

export default formatDate