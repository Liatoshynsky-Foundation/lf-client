// 'use client';
// import { Autocomplete, styled } from '@mui/material';
// import React, { SyntheticEvent, useState } from 'react';

// import { Svg } from '../colored-svg/ColoredSvg';
// import TextField from '../design-system/all-components/text-field/TextField';
// import { mainHexPallete } from '../design-system/all-components/theme/colors';

// const options = [
//   { label: 'The Godfather', id: 1 },
//   { label: 'Pulp Fiction', id: 2 }
// ];
// const CustomBorderTextField = styled(TextField)(() => ({
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       border: `1px solid ${mainHexPallete.black} !important`
//     },
//     '&:hover fieldset': {
//       border: `1px solid ${mainHexPallete.black} !important`
//     },
//     '&.Mui-focused fieldset': {
//       border: `1px solid ${mainHexPallete.black} !important`
//     }
//   }
// }));

// const SearchBar = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [autoCompleteValue, setAutoCompleteValue] = useState('');
//   //   console.log(searchValue);
//   const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // eslint-disable-next-line no-console
//     console.log(event.target.value);
//     setSearchValue(event.target.value);
//   };
//   const handleAutoCompleteSelection = (event: SyntheticEvent<Element, Event>, value: string) => {
//     setAutoCompleteValue(value);
//   };
//   return (
//     <Autocomplete
//       freeSolo
//       options={options}
//       disableClearable
//       clearIcon={false}
//       onInputChange={handleAutoCompleteSelection}
//       renderInput={(params) => (
//         <>
//           <CustomBorderTextField
//             onChange={handleInputSearch}
//             value={searchValue}
//             {...params}
//             variant="outlined"
//             fullWidth
//             startIcon={<Svg width="28px" height="28px" src="icons/search" color={'#190D03'} alt="black-search" />}
//           />
//         </>
//       )}
//     />
//     // <Autocomplete
//     //   freeSolo
//     //   disableClearable
//     //   options={options}
//     //   renderInput={() => (
//     //     <CustomBorderTextField
//     //       startIcon={<Svg width="28px" height="28px" src="icons/search" color={'#190D03'} alt="black-search" />}
//     //       onChange={handleInputSearch}
//     //     />
//     //   )}
//     // />
//   );
// };

// export default SearchBar;
