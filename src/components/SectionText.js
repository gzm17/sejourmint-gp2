import React from 'react';
import './SectionText.css';
// import TitleImage from 'assets/images/icons/snowflake0.svg'; <== This cannot resolve: WHY?

// This map section only index = 0 is used in return 
const SectionText = (props) => {
    const text = props.text.map((paragraph, index) => {
        // console.log('section text language: ', props.language);
        var text = '';
        if (props.language === 'en' ) {text = paragraph.text;}
        else if (props.language === 'jp' ) {text = paragraph.textJ;}
        else if (props.language === 'ch1' ) {text = paragraph.textCh1;}
        else if (props.language === 'ch2' ) {text = paragraph.textCh2;}
        else {}

        if (index === 0 ) {
            return (
                <div key={paragraph.id} className='sectionParagraph'>
                      <p>{text}</p> 
                    {/* {props.language === 'en' ? <p>{paragraph.text}</p> : <p>{paragraph.textJ}</p> } */}
                </div>
                )
        }

    });

    return (
        <div className='sectionText'>
            {text}
        </div>
    )
}

export default SectionText;