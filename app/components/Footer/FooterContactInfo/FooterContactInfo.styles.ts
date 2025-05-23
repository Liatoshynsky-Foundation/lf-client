const textStyle = {
    fontFamily: 'Mulish',
    letterSpacing: '0px',
    marginBottom: '8px',
    whiteSpace: 'pre-line',
    fontSize: { xs: '14px', sm: '16px' },
};

export const styles = {
    container: {
        width: '100%',
        maxWidth: 400,
        height: 232,
        top: 188,
        left: 72,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '24px 0',
    },
    title: {
        ...textStyle,
        fontWeight: 700,
        fontSize: { xs: '16px', sm: '20px' },
        lineHeight: '140%',
    },
    text: {
        ...textStyle,
        fontWeight: 400,
        lineHeight: '150%',
    },
    linkable: {
        ...textStyle,
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },
};