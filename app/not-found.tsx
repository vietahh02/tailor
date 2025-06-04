import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./404_st.css";
import Header from "./common/header";
import Footer from "./common/footer";

export default function Custom404() {
  return (
    <>
      <Header />
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 wrap_404">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you&#39;re lost</h3>

                  <p style={{ fontSize: 25 }}>
                    the page you are looking for not avaible!
                  </p>

                  <Link href="/" className="link_404">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
