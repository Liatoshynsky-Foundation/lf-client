export const styles = {
  menuItem: {
    minWidth: '153px',
    minHeight: '36px'
  },
  dropdownMenu: {
    minHeight: '88px',
    padding: '8px 0'
  },
  item: (isActive: boolean) => ({
    fontFamily: 'Mulish, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '145%',
    color: isActive ? 'black' : 'rgba(65, 43, 33, 0.6)', // Используем строковый токен 'black' из палитры
    background: 'none',
    border: 'none'
  }),
  mobileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    height: '40px'
  }
};
