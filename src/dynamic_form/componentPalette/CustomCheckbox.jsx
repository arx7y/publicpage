import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

const CustomCheckbox = ({
  value,
  options,
  required,
  disabled,
  invisible,
  label,
  selectedLanguage,
}) => {
  if (invisible) {
    return null;
  }
  return (
    <FormControl required={required} disabled={disabled} component="fieldset">
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                value={option.value}
                disabled={disabled}
              />
            }
            label={option.label.EN}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
export default CustomCheckbox;
