import ScheduleConsultation from '@/sections/ScheduleConsultation';
import VideoHero from '@/sections/HeroVideo';
import TextSection from '@/sections/TextSection';
import Hero from '@/sections/Hero';
import ContactDetails from '@/sections/ContactDetails';
import ButtonNav from '@/sections/ButtonNav';
import SliderFeatured from '@/sections/SliderFeatured';
import TextMediaSection from '@/sections/TextImageSection';
import TextMediaSectionPost from '@/sections/TextImageSectionPost';
import PostGrid from '@/sections/SliderPostGrid';
import Spacer from '@/sections/Spacer';
import ButtonSection from '@/sections/ButtonSection';
import LogoSlider from '@/sections/SliderLogo';
import TextSectionNews from '@/sections/TextSectionNews';
import HeroTextImage from '@/sections/unused/HeroTextImage';
import SliderCaseStudy from '@/sections/SliderCaseStudy';
import NavWork from '@/sections/NavWork';
import GalleryWorkSection from '@/sections/GalleryWorkSection';
import StatsSection from '@/sections/StatsSection';
import CardSection from '@/sections/CardSection';
import GridEmployeeSection from '@/sections/GridEmployee';
import GallerySection from '@/sections/GallerySection';
import ContactForm from '@/sections/ContactForm';
import TextTwoMediaSection from '@/sections/TextTwoImageSection';
import TextMediaFeaturedNewsSection from '@/sections/TextImageSectionFeaturedNews';
import GridNewsFeedSection from '@/sections/GridNewsFeedSection';
import TextSharedValues from '@/sections/TextSharedValues';
import CareersFeedSection from '@/sections/CareersFeedSection';
import GalleryWorkSinglePageSection from '@/sections/GalleryWorkSinglePageSection';
import InsightsPosts from '@/sections/InsightsPosts';

// TODO: ADD COMPONENTS HERE AS YOU GO
const acfToComponent: { [key: string]: any } = {
	button_nav: ButtonNav,
	button: ButtonSection,
	card_section: CardSection,
	careers_feed: CareersFeedSection,
	case_study_slider: SliderCaseStudy,
	contact_details: ContactDetails,
	contact_form: ContactForm,
	employee_grid: GridEmployeeSection,
	featured_slider: SliderFeatured,
	gallery_section: GallerySection,
	hero_text_image: HeroTextImage,
	hero: Hero,
	insight_posts: InsightsPosts,
	logo_slider: LogoSlider,
	news_grid_feed: GridNewsFeedSection,
	news_grid: TextSectionNews,
	post_grid: PostGrid,
	schedule_consultation: ScheduleConsultation,
	spacer: Spacer,
	stats_section: StatsSection,
	text_and_media_featured_news: TextMediaFeaturedNewsSection,
	text_media_section_post: TextMediaSectionPost,
	text_media_section: TextMediaSection,
	text_section: TextSection,
	text_shared_values: TextSharedValues,
	text_two_media_section: TextTwoMediaSection,
	video_hero: VideoHero,
	work_gallery_single_page: GalleryWorkSinglePageSection,
	work_gallery: GalleryWorkSection,
	work_nav: NavWork,
};

export default async function PageRenderer({ page }: { page: any }) {
	if (
		!page ||
		!page.acf ||
		!page.acf.content ||
		!Array.isArray(page.acf.content)
	) {
		return null;
	}

	return page.acf.content.map((component: any, key: number) => {
		const Component = acfToComponent[component.acf_fc_layout];

		// console.log('Component', Component);
		// console.log('page', page);

		if (Component) {
			return (
				<Component
					key={'component' + key}
					acf={component}
					page={page}
				/>
			);
		}

		return null;
	});
}
