import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
    logoContainer: {
        display: 'flex',
        alignItems: 'end',
        fontWeight: 600,
    },
    title: {
        fontSize: 25,
        fontWeight: 600,
    },
    button: {
        backgroundColor: '#D3D3D3',
        borderRadius: 7,
        marginLeft: 10,
        padding: 5,
    },
    input: {
        padding: 3,
        borderRadius: 7,
        border: '1px solid #000',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        '> thead': {
             borderRadius: 5,
             '> tr > th': {
                padding: 20,
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: '#1D4339',
                color: 'white'
             }
        },
        '> tbody': {
            '>  tr > td': {
                textAlign: 'center',
                padding: 20,
            },
            '> tr:nth-child(even)': {
                backgroundColor: '#F7F7F7',
            }
        }
    },
    tableContainer: {
        height: 600,
        overflow: 'auto'
    },
    noResultsContainer: {
        fontWeight: 500,
    }
}));