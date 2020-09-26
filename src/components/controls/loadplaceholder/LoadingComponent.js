import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

/** 
  * @desc Loading component:
  * Adds a placeholder while we're loading data.
  * @author Maximiliano Goffman maxgoffman@gmail.com
*/
export const Loading = ({divStyle, spinnerStyle}) => {
    return(
        <div className={`col-12 text-center align-baseline ${divStyle}`}>
            <FontAwesomeIcon icon={faSpinner} pulse size="3x"  className={`fa-fw ${spinnerStyle}`} />
        </div>
    );
};