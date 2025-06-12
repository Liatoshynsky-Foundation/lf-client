// 'use client';

// import {
//   Box,
//   Button,
//   Collapse,
//   FormControl,
//   IconButton,
//   MenuItem,
//   Paper,
//   Pagination,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow
// } from '@mui/material';
// import Image from 'next/image';
// import { useState } from 'react';
// import ArrowDownIcon from '~/public/icons/arrow-down-right.svg';
// import ArrowUpIcon from '~/public/icons/arrow-left-to-line.svg';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   status: 'Active' | 'Inactive';
// };

// const allUsers: User[] = Array.from({ length: 42 }, (_, i) => ({
//   id: i + 1,
//   name: `User ${i + 1}`,
//   email: `user${i + 1}@example.com`,
//   status: i % 2 === 0 ? 'Active' : 'Inactive'
// }));

// const ITEMS_PER_PAGE = 10;
// const HIDDEN_USER_COUNT = 3;

// export default function UserTablePureMUI() {
//   const [page, setPage] = useState(1);
//   const [collapsed, setCollapsed] = useState(false);
//   const [users, setUsers] = useState<User[]>(allUsers);

//   const hiddenUsers = users.slice(0, HIDDEN_USER_COUNT);
//   const visibleUsers = users.slice(HIDDEN_USER_COUNT);
//   const paginatedUsers = visibleUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
//   const totalPages = Math.ceil(visibleUsers.length / ITEMS_PER_PAGE);

//   const handleStatusChange = (id: number, status: User['status']) => {
//     setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status } : user)));
//   };

//   return (
//     <Box p={2}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Ім’я</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Дії</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell colSpan={3}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                   <strong>Приховані юзери</strong>
//                   <IconButton onClick={() => setCollapsed((prev) => !prev)}>
//                     <Image src={collapsed ? ArrowUpIcon : ArrowDownIcon} alt="toggle" width={20} height={20} />
//                   </IconButton>
//                 </Box>
//               </TableCell>
//             </TableRow>

//             {hiddenUsers.map((user) => (
//               <TableRow
//                 key={user.id}
//                 sx={{
//                   height: collapsed ? 'auto' : 0,
//                   overflow: 'hidden',
//                   transition: 'height 400ms ease',
//                 }}
//               >
//                 <TableCell sx={{ p: 0 }}>
//                   <Collapse in={collapsed} timeout={400} unmountOnExit>
//                     <Box p={2}>{user.name}</Box>
//                   </Collapse>
//                 </TableCell>
//                 <TableCell sx={{ p: 0 }}>
//                   <Collapse in={collapsed} timeout={400} unmountOnExit>
//                     <Box p={2}>{user.email}</Box>
//                   </Collapse>
//                 </TableCell>
//                 <TableCell sx={{ p: 0 }}>
//                   <Collapse in={collapsed} timeout={400} unmountOnExit>
//                     <Box display="flex" alignItems="center" gap={1} p={2}>
//                       <Button variant="outlined" size="small" onClick={() => alert(`User ID: ${user.id}`)}>
//                         Деталі
//                       </Button>
//                       <FormControl size="small" sx={{ minWidth: 100 }}>
//                         <Select
//                           value={user.status}
//                           onChange={(e) =>
//                             setUsers((prev) =>
//                               prev.map((u) =>
//                                 u.id === user.id ? { ...u, status: e.target.value as User['status'] } : u
//                               )
//                             )
//                           }
//                         >
//                           <MenuItem value="Active">Активний</MenuItem>
//                           <MenuItem value="Inactive">Неактивний</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Box>
//                   </Collapse>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {paginatedUsers.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Button variant="outlined" size="small" onClick={() => alert(`User ID: ${user.id}`)}>
//                       Деталі
//                     </Button>
//                     <FormControl size="small" sx={{ minWidth: 100 }}>
//                       <Select
//                         value={user.status}
//                         onChange={(e) =>
//                           setUsers((prev) =>
//                             prev.map((u) =>
//                               u.id === user.id ? { ...u, status: e.target.value as User['status'] } : u
//                             )
//                           )
//                         }
//                       >
//                         <MenuItem value="Active">Активний</MenuItem>
//                         <MenuItem value="Inactive">Неактивний</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box display="flex" justifyContent="center" mt={2}>
//         <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" />
//       </Box>
//     </Box>
//   );
// }
