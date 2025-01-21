import Nav from '../components/BottomNav'
import ProfileContent from '../components/Oauth0/ProfileContent'

type PropsTypes = {
    accountType: 'new_user' | 'merchant' | 'customer'
}

export default function Profile({ accountType }: PropsTypes) {
    return (
    <>
        <Nav />
        <ProfileContent accountType={accountType} />
    </>
    )
}