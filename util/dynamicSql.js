class DynamicSql {
    constructor (payload){
        this.payload = payload
    }

    fieldNames() {
        return Object.keys(this.payload)
    }
    fieldValues(){
        return this.fieldNames().map(fieldName => this.payload[fieldName])
    }
    placeholder(){
        return this.fieldNames().map(fieldName => `${fieldName} = ?`).join(', ')
    }
}

export default DynamicSql