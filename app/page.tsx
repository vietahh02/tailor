import Footer from "./common/footer";
import Header from "./common/header";
import ListCustomer from "./customers/ListCustomer";
import ListBanner from "./home/banner/ListBanner";
import DesignNail from "./home/design/DesignNail";
import ListProduct from "./products/ListProduct";

export default function Home() {
  return (
    <div>
      <Header />
      <ListBanner />
      <ListProduct />
      <DesignNail />
      <ListCustomer />
      <Footer />
    </div>
  );
}
