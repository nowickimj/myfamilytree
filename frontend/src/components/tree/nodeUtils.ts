import {GetNodeDetailsResponse} from "../../PersonApi";

export function formatNullableNodeStringProperty(property: string | undefined): string {
    return property ?? "-"
}

export function formatNullableNodeDateProperty(property: number[] | undefined): string {
    if (!property) {
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

export interface NodeDetailsProperty {
    idx: number,
    name: string,
    value?: string
}

export function getNodeDetailsProperties(node: GetNodeDetailsResponse | undefined): NodeDetailsProperty[] {
    if (!node) {
        return []
    }
    const properties: NodeDetailsProperty[] = [
        {idx: 0, name: "Imię", value: formatNullableNodeStringProperty(node.firstName)},
        {idx: 2, name: "Nazwisko", value: formatNullableNodeStringProperty(node.lastName)},
        {idx: 4, name: "Data urodzenia", value: formatNullableNodeDateProperty(node.dateOfBirth)}
    ]
    if (node.middleName) {
        properties.push({idx: 1, name: "Drugie imię", value: formatNullableNodeStringProperty(node.middleName)})
    }
    if (node.maidenName) {
        properties.push({idx: 3, name: "Naziwsko rodowe", value: formatNullableNodeStringProperty(node.maidenName)})
    }
    if (node.dateOfDeath) {
        properties.push({idx: 5, name: "Data śmierci", value: formatNullableNodeDateProperty(node.dateOfDeath)})
    }

    return properties
}