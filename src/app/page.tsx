import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Container } from "@/atom/Container";
import { MainHeader } from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import Slides from "@/template/Slides"; // ✅ Slides는 동적 import 제거 (LCP 최적화)
import { getBannerList } from "./api/banner/route";
import { getFeedList } from "./api/feeds/route";
import { getGateList } from "./api/gates/route";
import "./home.scss";

// ✅ 동적 Import (번들 분할) - 하단 컴포넌트만
const Gates = dynamic(() => import("@/template/Gates"), {
	loading: () => <Loader />,
	ssr: true,
});

const Feeds = dynamic(() => import("@/template/Feeds"), {
	loading: () => <Loader />,
	ssr: true,
});

export default async function Home() {
	// ✅ 병렬 데이터 페칭
	const [slideList, gateList, feedList] = await Promise.all([
		getBannerList(),
		getGateList(),
		getFeedList(),
	]);

	return (
		<>
			<MainHeader />
			<Container className="home" gap={48}>
				{/* ✅ Slides는 Suspense 없이 직접 렌더링 (LCP 향상) */}
				<Slides bannerList={slideList} />
				<Suspense fallback={<Loader />}>
					<Gates gateList={gateList} />
				</Suspense>
				<Suspense fallback={<Loader />}>
					<Feeds feedList={feedList} />
				</Suspense>
			</Container>
		</>
	);
}
