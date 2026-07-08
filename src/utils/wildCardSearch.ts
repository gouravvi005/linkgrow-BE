export default function wildCardSearch(
    list: Array<Record<string, any>>,
    input: string,
    specifyKey?: string,
) {
    const searchText = (item: Record<string, any>) => {
        for (const key in item) {
            if (item[specifyKey ? specifyKey : key] == null) {
                continue
            }
            if (
                item[specifyKey ? specifyKey : key]
                    .toString()
                    .toUpperCase()
                    .indexOf(input.toString().toUpperCase()) !== -1
            ) {
                return true
            }
        }
    }
    const result = list.filter((value) => searchText(value))
    return result
}
