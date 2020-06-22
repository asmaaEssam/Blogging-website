import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
const Filter = () => {
    return ( 
            <div id='filter' >
                <div>
                    <a className="posts" href="#">All posts</a>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSearch} id='icon'/><span>&nbsp;</span>
                    <input id="search" type="text" placeholder='Search'/>
                </div>
            </div>
     );
}
 
export default Filter;