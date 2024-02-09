import React from "react";
import "./Home.css";

//material ui icon
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import HelpIcon from "@mui/icons-material/Help";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; //firebase data
import { useNavigate } from "react-router-dom"; //navigation hook

const Home = () => {
  // navigate hook-----------------------------------
  const navigate = useNavigate();

  // auth sign in-------------------------------------------
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)

        // add navigtion
        navigate("/drivepage");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="home-container">
      {/* header section */}
      <header className="home-header">
        <MenuIcon className="home-menu" />
        <div className="home-logo">
          <img
            src="https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png"
            alt="driveLogo"
          />
          <span id="home-logo-google">Google</span>
          <span id="home-logo-drive">Drive</span>
        </div>
      </header>

      {/* hero-section */}
      <main className="home-main-section">
        <section className="hero-section">
          <h1>Easy and secure access to your content</h1>
          <p>
            Store, share, and collaborate on files and folders from your mobile
            device, tablet, or computer
          </p>
          <button onClick={signIn} className="home-signin-btn">
            Login With Drive
          </button>
        </section>

        {/* image section */}
        <section className="home-first-image">
          <img
            src="https://lh3.googleusercontent.com/6MmVl3TEiBeEJCFIIfzO5DIgengYGPCdhEe8M6lXA6_Eh_xsKHDL_K4CLC31dETfiCue1hFOEf30IkIqlbOStvTfYbY_G85oEtJHQqjgz6OSXco8Aw=w0-l80-sg-rj-c0xffffff"
            alt="one-drive-aaplication"
          />
        </section>

        {/* home-drive-details */}
        <section className="home-drive-details">
          <div className="home-drive-heading">
            <p>See what you can do with Google Drive</p>
            <KeyboardArrowDownIcon className="arrow-icon" />
          </div>

          <div className="home-drive-detail">
            <img
              src="https://lh3.googleusercontent.com/NJb2FyRsLOjbmSf0cCilv3XloxJ1GBvynoI-Wn7lRVDtHzEN_L1iHDmarKxo3qZKSoyudmqe909CJUTyCAtU75WLSrrHAkbEbQpPztDXZhMbmaR7E0SR=w0-l80-sg-rj-c0xffffff"
              alt="protection-img"
            />
            <div className="home-drive-detail-text">
              <h1>
                Built-in protections against malware, spam, and ransomware
              </h1>
              <p>
                Drive can provide encrypted and secure access to your files.
                Files shared with you can be proactively scanned and removed
                when malware, spam, ransomware, or phishing is detected. And
                Drive is cloud-native, which eliminates the need for local files
                and can minimize risk to your devices.
              </p>
            </div>
          </div>

          <div className="home-drive-detail home-drive-detail-even">
            <div className="home-drive-detail-text home-drive-text-even">
              <h1>People-first collaboration apps to supercharge teamwork</h1>
              <p>
                Drive integrates with{" "}
                <span style={{ color: "blue" }}>Docs</span>,{" "}
                <span style={{ color: "blue" }}>Sheets</span>, and{" "}
                <span style={{ color: "blue" }}>Slides</span>, cloud-native
                collaboration apps that enable your team to create content and
                collaborate more effectively in real time.
              </p>
            </div>
            <img
              src="https://lh3.googleusercontent.com/yCtJQGVMT5x-OVFBA4pAG3aUkGM5-KOl9Nb8w5Ah0ipsKP4Vupp0yRyWGOaQOx4ey5FsSxQLh8_KqMViHegT9uHmhb0elqAjXW27UU8zsQmC57wMRQ=w0-l80-sg-rj-c0xffffff"
              alt="protection-img"
            />
          </div>

          <div className="home-drive-detail">
            <img
              src="https://lh3.googleusercontent.com/KmMK86vU4Q4_etBMCy-VI7O9D08C-xqdXYFxjdxvAKXhLk8AUDcgwCV27ykWNu3H4gCf8QNLEYCJcSQsUjMD0qr6KgF0AbZywYS2kQGcW7p9lipDa4_q=w0-l80-sg-rj-c0xffffff"
              alt="protection-img"
              style={{ marginRight: "4rem" }}
            />
            <div className="home-drive-detail-text">
              <h1>
                Integration with the tools and apps your team is already using
              </h1>
              <p>
                Drive integrates with and complements your team’s existing
                technology. Collaborate in Microsoft Office files without the
                need to convert file formats, and edit and store over 100
                additional file types, including PDFs, CAD files, images, and
                more.
              </p>
            </div>
          </div>

          <div className="home-drive-detail home-drive-detail-even">
            <div className="home-drive-detail-text home-drive-text-even">
              <h1>
                Google’s Search and AI technology helps your team move faster
              </h1>
              <p>
                Google’s powerful search capabilities are embedded in Drive and
                offer speed, reliability, and collaboration. And features like
                Drive search chips help your team find files fast by quickly
                surfacing more relevant results.
              </p>
            </div>
            <img src="https://lh3.googleusercontent.com/a6eNE5cl4T8gQ_3qBPaKlHJhTuGYoPPCi8G43zuzir5eXbSXmC_PmZHQgMd5dFoV-tsTZs-g6a8mUL_OY_4SH5R_M4ssXq124fNXKpi6pP5LcOLUQwo=w0-l80-sg-rj-c0xffffff" />
          </div>
        </section>

        {/* home-drive-use-teams */}
        <section className="home-drive-use-teams">
          <div className="home-drive-use-team-data">
            <h1>
              Thousands of teams are already using Drive to revolutionize the
              way they work
            </h1>
            <div className="home-drive-use-company">
              <img
                src="https://kstatic.googleusercontent.com/files/dde2c6d0199759ba1261fd84bf5f2d2d5a46bf1ceb7c8c3b03f247a53c8f0c6c2b6e62f8c2c2192c24a961f2e8c7d4f29dd6b2890e326fb1aa396c9dbdd5f3eb"
                alt="drive-use-compnay-1"
              />
              <img
                src="https://kstatic.googleusercontent.com/files/d03551fdf2c8749e3cb46bd9e57f81f1821db06f2f781fb8548069d64383e064809e0244690b29cf93426f3270d5d9d12f2341dae9dcf357d9f88c6e0005f5ad"
                alt="drive-use-compnay-2"
              />
              <img
                src="https://kstatic.googleusercontent.com/files/729e1fb4793a8ba1290e61058c17ad0eca27d2022a971e24544e9a82e8346bfd12909939458c874ca23d3c84a246070258587103a9675739036c3985f77b992c"
                alt="drive-use-compnay-3"
              />
              <img
                src="https://kstatic.googleusercontent.com/files/08e84da11f0911a81fe26be9c9667a1be1d7b5121c34ed6e730f5fb328215c7273603f3573bbe2d90536f2fc2856c72a6eb6b8fb209cd688721952a81bffbc4a"
                alt="drive-use-compnay-4"
              />
            </div>
          </div>
        </section>

        {/* home-drive-tools */}
        <section className="home-drive-tools">
          <h1>Drive integrates with the tools your team is already using</h1>
          <div className="drive-tools-imgs">
            <div className="drive-tool">
              <img
                src="https://kstatic.googleusercontent.com/files/a452529e201b5a2df2ee78aaa26196adb2f3d770ad1b41a7aab87af4b2298415469feced5343d47685651de742548ee68ccb169ac30cd7adb1eddd0c1abce048"
                alt="drive-tool-1"
              />
            </div>
            <div className="drive-tool">
              <img
                src="https://kstatic.googleusercontent.com/files/60dd2ade31bb7911a43bd12c9e3f2016d6eac9f2c9a9fa1d5236ab7ca36f4d4514e46f01d3988db306c9d26daafb152e5c6de494e94b449804d34e37ee44c7b9"
                alt="drive-tool-2"
              />
            </div>
            <div className="drive-tool">
              <img
                src="https://kstatic.googleusercontent.com/files/a71fde568bffcc2d8c0ed236d5875634ccad9aadc73b30ed310bdb4355d2de80ae27a51c3597febe87e409eddc8c744327a454e709fd100925e9e5176fa7a3af"
                alt="drive-tool-3"
              />
            </div>
            <div className="drive-tool">
              <img
                src="https://kstatic.googleusercontent.com/files/c7207b3783c876e2b402ab1a75650368c4a4591cadee2184ffaf923179b3218d4d9a08aff8b80b78e36a47d160a8744f2372cdd51072491155609bf16534c405"
                alt="drive-tool-4"
              />
            </div>
            <div className="drive-tool">
              <img
                src="https://kstatic.googleusercontent.com/files/ddf9229b8e8e00daa490de51a7227de227f3b13db0b70a50dfff3de5088f643f0402ade09e63203a8e1b7132392d5db233e9a5f6c00fd57b47cebcdfd4853a8f"
                alt="drive-tool-5"
              />
            </div>
            <div className="drive-tool">
              <img
                src="https://kstatic.googleusercontent.com/files/f9d1c7f501c4888a2f60647d23ce9f1c76377f3f9b910cfb05db4e3bb17621d1dbab0d26f2870996ff296b7bbbd87171b91e288ba0c09aa0623bc6441e9aab6a"
                alt="drive-tool-6"
              />
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="footer-container">
        <div className="footer-top">
          <div className="footer-top-left">
            <p>
              Follow our <span style={{ color: "blue" }}>Blog</span>
            </p>
            <YouTubeIcon />
            <TwitterIcon />
            <FacebookIcon />
          </div>
        </div>
        <hr className="footer-hr" />
        <div className="footer-bottom">
          <ul className="footer-bottom-left">
            <li>Google</li>
            <li>About Google</li>
            <li>Google products</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
          <ul className="footr-bottom-right">
            <p className="footer-help-icon">
              <HelpIcon />
              <span>Help</span>
            </p>
            <p>English(India)</p>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
