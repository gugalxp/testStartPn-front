import React from 'react'
import Header from '../../components/Header';
const ThowColumnLayout = ({colum2Data,page,typeHeader}) =>{
    

    const container_three_column = {

        'display': 'grid',
        'grid-template-columns': '0.2fr 1fr',
    }

    const column1 = {

        gridColumnStart: '1',
        gridColumnEnd: '1',
        gridRowStart: '1',
        gridRowEnd: '1'
    }

    const column2 = {
    

        gridColumnStart: '1',
        gridColumnEnd: '4',
        paddingLeft:"9.6em",
        paddingRight:"2.7em",

        paddingTop:"8.5rem",
        gridRowStart: '1',
        gridRowEnd: '1',


    }


    

    return(
        <div style={container_three_column}>


        <div style={column1}>
        <Header page={page}/>
        </div>{/* End column1*/}


        <div style={column2}>
    
        {colum2Data}

        </div>{/* End column2 */}




        </div> 
    )

}

export default ThowColumnLayout