type TitleLabelFormItemProps = {
  name: string;
};
const TitleLabelFormItem = (prop: TitleLabelFormItemProps) => {
  return <label style={{ paddingLeft: '0px', fontWeight: '500' }}>{prop.name}</label>;
};
export default TitleLabelFormItem;
