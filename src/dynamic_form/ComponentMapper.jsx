import CustomParagraph from "./componentPalette/CustomParagraph";

const componentMap = {
  paragraph: CustomParagraph,
  // Add more component types here in the future
};

const ComponentMapper = ({ type, props }) => {
  const Component = componentMap[type];
  return <Component props={props} />;
};

export default ComponentMapper;
