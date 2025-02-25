'use client'
import {Button, Space, message} from "antd";
import {useRequest} from "ahooks";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {
    PlusOutlined,
    BarsOutlined,
    StarOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import {createQuestion} from '@/services/question'
import {Suspense} from "react";
import Loading from "@/app/manage/loading";


export default function ManageLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    // const [isLoading,setIsLoading] = useState(false)
    const pathname = usePathname();
    const router = useRouter()


    const {loading, run} = useRequest(createQuestion, {
        manual: true, onSuccess(result) {
            router.push(`/question/edit/${result.id}`)
            message.success('创建成功')
        }
    })

    return (

        <div className="flex mx-auto p-10">
            <Space direction="vertical" size={16}>
                <Button type="primary" className="mb-4" icon={<PlusOutlined/>} onClick={run} loading={loading}>
                    创建问卷
                </Button>
                <Button type={pathname === "/manage/list" ? "default" : "text"} icon={<BarsOutlined/>}>
                    <Link href={"/manage/list"}>我的问卷</Link>
                </Button>
                <Button type={pathname === "/manage/star" ? "default" : "text"} icon={<StarOutlined/>}>
                    <Link href={"/manage/star"}>星标列表</Link>
                </Button>
                <Button type={pathname === "/manage/trash" ? "default" : "text"} icon={<DeleteOutlined/>}>
                    <Link href={"/manage/trash"}>回收站</Link>
                </Button>
            </Space>

            <div className="flex-1 ml-6 ">
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </div>
        </div>
    );
}
