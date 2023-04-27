import {FamilyDto, PersonDto} from "../../ApiQueries";

export function formatPersonName<T extends {
    firstName?: string,
    middleName?: string,
    lastName?: string
}>(o: T): string {
    return o.firstName ?? ""
        + " " + (o.middleName ? o.middleName + " " : "")
        + o.lastName ?? ""
}

export function formatFamilyName(family: FamilyDto): string {
    let result = []
    result.push(family.parents.map(formatPersonName).join(", "))
    result.push(family.children.map(formatPersonName).join(", "))
    return result.join(", ")
}

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

export interface PersonProperty {
    idx: number,
    name: string,
    value?: string
}

export function getPersonProperties(node: PersonDto | undefined): PersonProperty[] {
    if (!node) {
        return []
    }
    const properties: PersonProperty[] = [
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