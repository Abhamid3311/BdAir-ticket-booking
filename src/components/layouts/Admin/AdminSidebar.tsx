import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { useAuthState, } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '@/components/utils/firebase';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/users/userSlice';

export default function AdminSidebar() {
    const { data: session } = useSession();
    const [user] = useAuthState(auth);
    const router = useRouter();
    const dispatch = useAppDispatch();


    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(setUser(null));
            router.push("/")
        })
    }

    return (
        <div>
            <Sidebar aria-label="Sidebar with logo branding example">

                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item icon={HiChartPie} ><Link href="/Admin-dashboard"> Overview</Link> </Sidebar.Item>

                        <Sidebar.Item icon={HiInbox} ><Link href="/Admin-dashboard/user-managment">Users</Link></Sidebar.Item>
                        <Sidebar.Item icon={HiUser} ><Link href="/Admin-dashboard/deals-managment">Deals</Link> </Sidebar.Item>
                        <Sidebar.Item icon={HiUser} ><Link href="/Admin-dashboard/Bookings">Booking</Link> </Sidebar.Item>


                    </Sidebar.ItemGroup>

                    <Sidebar.ItemGroup>
                        {/* <Sidebar.Item icon={HiUser} ><Link href="/Admin-dashboard/profile">Profile </Link> </Sidebar.Item> */}
                        <Sidebar.Item icon={HiShoppingBag} onClick={() => handleLogout()}><button> Logout</button> </Sidebar.Item>
                    </Sidebar.ItemGroup>

                </Sidebar.Items>
            </Sidebar>


        </div>
    )
}
