export function formatNullableNodeStringProperty(property: string | undefined): string {
    return property ?? "-"
}

export function formatNullableNodeDateProperty(property: number[] | undefined): string {
    if(!property) {
        return "???"
    }
    const year = property[0].toString()
    const month = formatMonthDay(property[1].toString())
    const day = formatMonthDay(property[2].toString())
    return year + "-" + month + "-" + day;
}

function formatMonthDay(property: string): string {
    return property.length == 2 ? property : "0" + property;
}