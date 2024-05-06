import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { IoCaretDownSharp } from 'react-icons/io5'
import CreatorSwitches from "./CreatorSwitches"
import { MobileSidebarInitiator } from "./MobileSidebarInitiator"
import SingleCreatorSwitch from "./SingleCreatorSwitch"
import { divSwitch } from "./context/divswitch"
const BrandCreatorsBody = () => {
    const [sortSelect, setSortSelect] = useState(false)
    const [ activeSort, setActiveSort ] = useState('Recommended')
    const [switchStatus, setSwitchStatus] = useState({
            status: false,
            data: {}
    })

    const handleSelectSort = (i) => {
        setActiveSort(i);
        setSortSelect(false)
    }
    const openSelectBox = () => setSortSelect(!sortSelect)
  return (
    <div className="brand-creators-body">
               <MobileSidebarInitiator />
               <div className="creators-header">
                           <div className="texts-header">
                                     <h2>Digitize Brand Yako</h2>
                                     <p>Manage All your creators from one place</p>
                           </div>
                           <div className="search-and-actions">
                                    <div className="search-bar">
                                               <span><BsSearch /></span>
                                               <input type="text" placeholder="Search Creators" className="search-control" />
                                    </div>
                                    <div className="sorter">
                                               <div className="sorter-active" onClick={openSelectBox}>
                                                         <h5>{activeSort}</h5>
                                                         <span className="down"><IoCaretDownSharp /></span>
                                               </div>
                                               <div className={sortSelect ? "sorter-options active" : "sorter-options"} >
                                                          <ul>
                                                                   <li className={activeSort === 'Recommended' ? 'active' : ''} onClick={() => handleSelectSort('Recommended')}>Recommended</li>
                                                                   <li className={activeSort === 'Most Followed' ? 'active' : ''} onClick={() => handleSelectSort('Most Followed')}>Most Followed</li>
                                                                   <li className={activeSort === 'Most Appreciated' ? 'active' : ''} onClick={() => handleSelectSort("Most Appreciated")}>Most Appreciated</li>
                                                          </ul>
                                               </div>
                                    </div>
                           </div>
               </div>

              
               <div className="brand-creator-switches">
                        <div className="brand-creator-switches-inner">
                                 <divSwitch.Provider value={[switchStatus, setSwitchStatus]}>
                                           <CreatorSwitches />
                                           <SingleCreatorSwitch />
                                 </divSwitch.Provider>
                        </div>
                      
               </div>
    </div>
  )
}

export default BrandCreatorsBody