import styles from './style.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import usersData from '../../data/example.json';
import { useState } from 'react';
import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import UserDetailsField from '../../components/UserDetailsField';
import type { EducationAndEmployment, Guarantor, PersonalInformation, Socials, UserProfile } from '../../data/interfaces';

export default function UserDetails() {
    const navigate = useNavigate();

    const location = useLocation();
    const [currentUser, setCurrentUser] = useState<UserProfile>(location.state.user);

    const handleNavigation = () => {
        navigate('/dashboard');
    }

    const handleStatusChange = (newStatus: string) => {
        const savedData = localStorage.getItem('userTableData');
        const currentData =  savedData ? JSON.parse(savedData) : usersData

        const updatedData = currentData.map((user: UserProfile) =>
            user.email === currentUser.email ? { ...user, status: newStatus } : user
        );

        localStorage.setItem('userTableData', JSON.stringify(updatedData));
        setCurrentUser({ ...currentUser, status: newStatus });
    };

    const handleRatingChange = (newRating: number) => {
        const savedData = localStorage.getItem('userTableData');
        const currentData = savedData ? JSON.parse(savedData) : usersData;

        const updatedData = currentData.map((user: UserProfile) =>
            user.email === currentUser.email ? { ...user, rating: newRating } : user
        );

        localStorage.setItem('userTableData', JSON.stringify(updatedData));
        setCurrentUser({ ...currentUser, rating: newRating });
    };

    const currentStatus = currentUser?.status;
    const userPersonalInformation : PersonalInformation = currentUser?.personalInformation;
    const userEducationAndEmployment : EducationAndEmployment = currentUser?.educationAndEmployment;
    const userSocials : Socials = currentUser?.socials;
    const userGuarantors : Guarantor[] = currentUser?.guarantor;

    return (
        <>
            <Navbar />

            <div className={styles.container}>
                <Sidebar />
                <div className={styles.selected_screen}>
                    <button className={styles.return_button} type='button' onClick={handleNavigation}>
                        <FontAwesomeIcon className={styles.menu_icon} icon={faArrowLeft} />Back to Users
                    </button>

                    <div className={styles.top_bar}>
                        <h1 className={styles.title}>User Details</h1>
                        
                        <div className={styles.buttons}>
                            {currentStatus !== 'Blacklisted' &&
                                <button className={styles.blacklist} type='button' onClick={() => handleStatusChange('Blacklisted')}>BLACKLIST USER</button>
                            }

                            {currentStatus !== 'Pending' && 
                                <button className={styles.pending} type='button' onClick={() => handleStatusChange('Pending')}>PENDING USER</button>
                            }

                            {currentStatus !== 'Active' &&
                                <button className={styles.activate} type='button' onClick={() => handleStatusChange('Active')}>ACTIVATE USER</button>
                            }

                            {currentStatus !== 'Inactive' &&
                                <button className={styles.deactivate} type='button' onClick={() => handleStatusChange('Inactive')}>DEACTIVATE USER</button>
                            }
                        </div>
                    </div>
                    
                    <div className={styles.info_header_container}>
                        <div className={styles.info_header}>
                            <div className={styles.main_info}>
                                <div className={styles.profile_picture}>
                                    <FontAwesomeIcon className={styles.icon} icon={faUser}/>
                                </div>
                                <div className={styles.user}>
                                    <div className={styles.fullname}>{userPersonalInformation.fullName}</div>
                                    <div className={styles.username}>{currentUser.username}</div>
                                </div>
                            </div>
                            
                            <hr/>

                            <div className={styles.tier_info}>
                                <div className={styles.title}>User's Tier</div>
                                <div className={styles.rating}>
                                    {[1, 2, 3].map((starValue) => (
                                        <div 
                                            key={starValue} 
                                            onClick={() => handleRatingChange(starValue)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FontAwesomeIcon 
                                                className={styles.icon} 
                                                icon={starValue <= currentUser.rating ? faStarSolid : faStar}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr/>

                            <div className={styles.bank_info}>
                                <div className={styles.account_balance}>{currentUser.accountBalance}</div>
                                <div className={styles.account}>{currentUser.accountNumber}/{currentUser.bankName}</div>
                            </div>
                        </div>
                        <div className={styles.tab_navigator}>
                            <button className={styles.active} type='button'>General Details</button>
                            <button type='button'>Documents</button>
                            <button type='button'>Bank Details</button>
                            <button type='button'>Loans</button>
                            <button type='button'>Savings</button>
                            <button type='button'>App and System</button>
                        </div>
                    </div>

                    <div className={styles.general_info}>
                        <div>
                            <h1 className={styles.title}>Personal Information</h1>
                            
                            <div className={styles.info_section}>  
                                <UserDetailsField title='FULL NAME' value={userPersonalInformation.fullName}/>
                                <UserDetailsField title='PHONE NUMBER' value={userPersonalInformation.phoneNumber}/>
                                <UserDetailsField title='EMAIL ADDRESS' value={userPersonalInformation.emailAddress}/>
                                <UserDetailsField title='BVN' value={userPersonalInformation.bvn}/>
                                <UserDetailsField title='GENDER' value={userPersonalInformation.gender}/>
                                <UserDetailsField title='MARITAL STATUS' value={userPersonalInformation.maritalStatus}/>
                                <UserDetailsField title='CHILDREN' value={userPersonalInformation.children}/>
                                <UserDetailsField title='TYPE OF RESIDENCE' value={userPersonalInformation.typeOfResidence}/>
                            </div>
                        </div>

                        <hr/>

                        <div>
                            <h1 className={styles.title}>Education and Employment</h1>

                            <div className={styles.info_section}>
                                <UserDetailsField title='LEVEL OF EDUCATION' value={userEducationAndEmployment.levelOfEducation}/>
                                <UserDetailsField title='EMPLOYMENT STATUS' value={userEducationAndEmployment.employmentStatus}/>
                                <UserDetailsField title='SECTOR OF EMPLOYMENT' value={userEducationAndEmployment.sectorOfEmployment}/>
                                <UserDetailsField title='DURATION OF EMPLOYMENT' value={userEducationAndEmployment.durationOfEmployment}/>
                                <UserDetailsField title='OFFICE EMAIL' value={userEducationAndEmployment.officeEmail}/>
                                <UserDetailsField title='MONTHLY INCOME' value={userEducationAndEmployment.monthlyIncome}/>
                                <UserDetailsField title='LOAN REPAYMENT' value={`${userEducationAndEmployment.loanRepayment}`}/>
                            </div>
                        </div>

                        <hr/>

                        <div>
                            <h1 className={styles.title}>Socials</h1>

                            <div className={styles.info_section}>
                                <UserDetailsField title='TWITTER' value={userSocials.twitter}/>
                                <UserDetailsField title='FACEBOOK' value={userSocials.facebook}/>
                                <UserDetailsField title='INSTAGRAM' value={userSocials.instagram}/>
                            </div>
                        </div>
                        
                        <hr/>

                        <div>
                            <h1 className={styles.title}>Guarantors</h1>
                            
                            <div className={styles.info_sections}>
                                {userGuarantors.map((guarantor, index) => (
                                    <div className={styles.info_section} key={index}>
                                        <UserDetailsField title='FULL NAME' value={guarantor.fullName}/>
                                        <UserDetailsField title='PHONE NUMBER' value={guarantor.phoneNumber}/>
                                        <UserDetailsField title='EMAIL ADDRESS' value={guarantor.emailAddress}/>
                                        <UserDetailsField title='RELATION SHIP' value={guarantor.relationship}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
