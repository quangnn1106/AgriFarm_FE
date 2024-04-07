type LabelFormItemProps = {
    name: string
}
const LabelFormItem = (prop: LabelFormItemProps) => {
    return (
        <label style={{ color: "#000000" }}>{prop.name}</label>
    )
}
export default LabelFormItem