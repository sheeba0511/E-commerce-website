import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


export const productList = [
  {
    _id: 1,
    numOfReviews: 1,
    name: "Apple Laptop",
    price: 124900,
    discription: "This is a sample product",
    category: "Laptop",
    ratings: 3,
    Stock: 5,
    images: [
      {
        id: 1,
        public_id: "sample_Image",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGI1tLE0zAnQ4e1a1UC5Ly00M0RoVSXdcZ_A&usqp=CAU",
      },
    ],
    reviews: [
      {
        _id: 1,
        name: "Sheeba",
        rating: 4,
        comment: "good",
        user: "12345678",
      },
    ],
  },
  {
    _id: 2,
    numOfReviews: 1,
    name: "Camera",
    price: 12549,
    discription: "This is a sample product",
    category: "Camera",
    ratings: 3,
    Stock: 0,
    images: [
      {
        id: 1,
        public_id: "sample_Image",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY-jkbgbvzOXUsFbWiRBpLrVreoFE_h8dfew&usqp=CAU",
      },
    ],
    reviews: [],
  },
  {
    _id: 3,
    numOfReviews: 0,
    name: "Apple iPhone",
    price: 99999,
    discription: "This is a sample product",
    category: "Smart Phone",
    ratings: 5,
    Stock: 4,
    images: [
      {
        id: 1,
        public_id: "sample_Image",
        url: " data:image/jpeg;base64,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",
      },
    ],
    reviews: [],
  },
  {
    _id: 4,
    numOfReviews: 1,
    name: "Titan Neo Anology Watch ",
    price: 15999,
    discription: "This is a sample product",
    category: " Wrist Watch",
    ratings: 4,
    Stock: 3,
    images: [
      {
        id: 1,
        public_id: "sample_Image",
        url: "https://m.media-amazon.com/images/I/616LuWzn7bL._UY550_.jpg",
      },
    ],
    reviews: [],
  },
  {
    _id: 5,
    numOfReviews: 0,
    name: "Apple computer",
    price: 215500,
    discription: "This is a sample product",
    category: "Computer",
    ratings: 5,
    Stock: 6,
    images: [
      {
        id: 1,
        public_id: "sample_Image",
        url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUSFRgVEhUZGBgYGBgZGBISGBwYGBgYGBgaGRgYGBgcIS4lHB4rIRgZJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjEhISs0MTY0MTQ0NDQ0MTE0NDQ0MTQ0MT82NDQ0NDQ0NDQ0NDExNDExNDQ0PjExNDQ0NDQ0NP/AABEIALcBFAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAIDBQcEBgj/xABNEAACAQIDAwYJCQMLAwUBAAABAgADEQQSIQUxURQiQWFxkQYTUlSBkqHR0gcXMkJTk7HB8BUWlCMzNGJydIKisrPhRGNzJWSjwvEk/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAmEQEBAQEAAQQCAAcBAAAAAAAAARECEhMhMWEDUSJBUnGBkfAj/9oADAMBAAIRAxEAPwDNQ0IaRBoc00wmDQhpDmhzQJs0IaQ5oQ0CYNDmkQaENAmDQhpzNWUb2A7TFylPKHfA6s0IacvKk8od8PKk8od8DqzQ5py8qTyx3w8rTyx3wOq8OacvKk8pe+HlaeUvfA6rw3nJyxPLXvh5Ynlr3wuOu8V5y8sTy174uWp5a98I67w3nJyyn5a98PLaflr3wOqKc3Laflr3xctp+WvfA6Ypz8tp+WvfCMZTP117xAniiEUBRRRQFFFFAUUUUBRRRQKHNDmkV4bw0lzQ3kV4bwJQ0OaRXhzQJM0cGkWaENDLmw2GatVSmls1R1RSxsMzsFFz0C53z1vzZY24Gajrxdrb7anLp6ZQeDOuOwo/9zQ/3Vn0dXrKjENe27TTUzn11dkjrzJm1h/zZ43yqG6/84fh0MXzZ47TnUNf+4ezXm6embbV2ilOxfp3aXBNuABMVDaqVLhbaDWwIIve28dR7o27jHnxufzYgPk1xp+tR321qH4fbCfk1x3lUNDb+c/Dm6jsm0ftujvubccp3cfoyWjtak5AUkk7hlt7Ssu/cWd/jrFPmvx2/Nh/vh7oz5s8b9phvv1903blK8D/AJfdEK6cD3LHu1/D+mEfNrjfLw38QsB+TfG+Xhv4hZvAxFMfSBA7E/OHlNDr7klypvDBD8nWL+0w38QsHzdYvy8N/EJN75RQ6/VSLx9DgfVSMp5cMD+b3FfaYX+JT3wfN/ivtML/ABKe+b547D8D6qReNw/D/KkuVPLj/qwJvAHFAE+MwxsCbDEoTpwAOpjR4CYo35+H0JGtdBexI0v0ab+m44zfmxGGG+w7RTEfnoeSej6qdO6F3m/D5+/cTE3t4zDfxCcbb5T7Y2PUwrKlQoSyZwabBxa5XUjceadJ9FbTxFFRawGdWCc0an0C3SO+Yj4dp/K0z/2//s01JLLSzJuOPZrfya36LjuJAnVecOzjzB6fxM680jmkvDI7w3gPijbxXgOigvFeAYoooHmrw3kd4bw0kvDeR3ivAkvFeMvDeA+8IaMvCDA7fBb+n4XW3/8ATh9eH8qk37am0kpPke5LAFSoDCw37zPn/wAGP6dhf7zQ/wB1Z9C43BUnJZ1VioHOa/Nv0TnLz6k8vj3XqdX8d8c3Z8osNtFKwDIrZTfUqOjSx39s6A666HX+ru9kgq7PIVUov4kAkkIoIN+0yJtm1jrypx1BFt7TO954t2XP7vPL+TmZedv7jqXKN637U9whzoPqH0IfdONMBVbXlL8LBFPp+kZ0JhXDKTWJANyuUc7qOs59ZL7e7fNv9Nn+nQrA9HfpDccJwNs1b3NRxv6Rb2jXfOjk65Mmc7subMM3b2y2c/tZe788u3CUldgrqCNdD2GdT7JpmwZFIv5PVv1P5Ss2Ls8U6qtmc6MLM1xqOyejzi9tb9ht32tLbZ8VJzOpvUmq4bCodNGn6o90d+w8P9gnd/xLBWvx7rfjHSefX7p6PH6it/YeH+xTu/4i/YeH+xTu/wCJYFrWGuvAE956IBUvx9II/ER59fur6P4/6Y4P2Jh/sU7v+JWsvMyrzTawIANtNDaeknjKmyA5v4yoNSdCLandqN01LvzWep4TOJ/o6rh3CktUzWBNig3W3b9Jh/hTtBK702pk6JY3Ftc17TbBscIGbxlQ6bmYW0udwE+eqxuFP9US9WZ7Xf8AGH4/KTLM/wA678A3MHafxnVmnBgG5npM6g0w2mDQhpDeHNAmvCGkQaHNAlvDeRBoQ0CS8UjzQwPN3hvBFDQ3hvGxXgOvDeMvDeA+8IMjvCDAs/BRc2Pwg44mh/urPol6YQuLDePpbtdJ88+Bo/8AUMJ/eqPsqKZ9GYs3ZtL7py6kvcrct8bDbRFfwP63x0Zbq6G6B0ntnRgSv5frfGqO3eej/mBkYk84bx9UdHXeOFO3DeTuHTMy7/LFsMqYZKls6K1txYA23fr0SJtnUTa9JDY3F1GhHSOudKxxlxZ3ZPa1Pgfpr6f9JllXoiorI2oYEMOIIsZWYI2Zb9fV9Uy0z9nfL8M5LsrmwGzKdAk01tmAB1Jvlvbf2mdpkfjOzvldV2syuVFGowBtnUc06bwd0lt3bTjiZnMyR2a369dytb8bR1Ea+jyWH4/hOaji87Wam66HnNcDs7dZ2+MHV3yS6Sy+8SWnn1l540dXfKVhYnXS5t3npmgyoLg9h/CfNWOUcywtdfo8N2ntM+mDPmraa2KDNmsGF733EdM1PipSwhsvpMnDTlw50Pb+QkuaRE4aENIM0cGgS5o4NIQ0IaBMGhDSINCGgS5opFmhgUcUdaC0NBDFaK0BRQRQDCpjYl3wLrwN/p+F/vFP/UJ9Cs2YtpfUaXt0T568Dv6fhf8AzJ+M+gKS6Pe55w0HYJx6v/pJ9Nyfw2pqxNtM3+GxPtgQEb2J7QPyAjcTa2tt/wBZintENNri+n+E5h3zqyfeEGCIQhy2/R/KEzmONQGxzXGmiOde0LJeUL1+q3umb1J81rx6/SQW/WvtisL/AK/DukBxiDyvQj/DAuNQ7s3qOPxWanvNjGzc33dBEatNeJ9ZvfCrAi46eOnsMdCmlAT0+gkfhDkA4+kk+0w3hvAAEVtf1+EV4rwEZ837csGAHQzjuIn0hefN+3Us5Jtq9WwBFwA9ud3TU+KlclFtJLmkFI6R95ES3js0hzQ5oaTBog0izQ5oZShoQ0iDRwaBLeKRZooHIVgKzoKRpSBz5YMsnKQFIaQWgtJisBWBFaJRqI8rEF1gW3gb/TsN/wCZJv8AQNw+/wCmPo79wnzv4PVSmKosGCFXBztay9Zzad81TH7celRLpiwM+UJzad2NrlyoBtfdrpYTnebe5W51PHHvXcDf7AT+AjPGDgfVPumP1PC/GgB2xThTwSgTYaeQbemOw3hfjGNuV8LXWj0kb7J1/jwnTGNbArg9HepH4iKZvW2vij/N48WBVS5FDU6lmC5b/riY7AbTxNQMau0TT3lbJhze1rrYqCDqfVic2pbI0i8V+qZlV2xiA1l2i2XKD9HDhr8CMuX/ADei0e+064F/2meoWoEtqBpZCBoSdbaDjpHi00q/VFfqmbU9rVc1m2kzDLfMOT2ubc36F76nujcXtqsmTJj2fM2VgGw65ASecSU52munGJzbNjNvj1laX6IvRM0O26odRy58pBuzPhxlIvY2Cak2HrdUtMTjkzhV2wqrmBNRfFHQi5GoI0vb0R408o9vfqEV+oTxWG2ihfI21LqFa1UvRGYg6XW2hP5Tz2J8Kq6EAYwHU5srIQBqFF7dOh9Bl8aeUasT1SNq6gXIsOJVh+ImPY3wrxStzccSNPommejXW0VPwwxITM2MJI+rdMx9AXr6t0eNPJsKYlCQARqbenhPnrwlW1RwBoKtX/WZft4aYnKo5U9yOc10uD0fVta085tXFK6rYgnMzu/1mdibkj9bzLJkpquUx95GIbzKJLxXjLw3ho+8N5HeG8CS8OaR3ivAlzRSO8UDsNONKTqKQGnDLkKRpSdhSMKQOQpGlJ1mnGlIHIUhSkWZVUXLEAAdJJsB3mTlJ07MT+Xo/wDlpf61gI+COO82fvX4oP3Ox3mz96/FNuUyRZGmHjwMx/mz96/FCPArH+bP6yfFNzWSKIGEjwIx/mzesnxQjwH2h5s3rJ8U3gCOAgYN+42P82b10+OL9xdoebN69P4pvdo4LAwMeAm0PNm9en8ccPALaPmp+8p/HNz2pixh6FSsVLCmjuVXecqk2v0bt88x4E+GDbQrVUamECorBTUDEa5bKoQFhvJYnS6i0DNR4AbR81P3lL44R4AbR81P3lL459AAR4SB8/D5Ptpean7yj8cI+Tzafmp+9o/HPoMJHhYHzyPk62n5qfvaPxx3zdbT81P3tH459DBY4JA+ePm62p5qfvaPxxD5N9qn/pv/AJqPxz6JCSRUgfL23PBvFYDJyunk8Zmyc9HzZMub6DG1sy7+MqbzXfl5TTBHrxA7xRP5TIbyh14bxl4bwHXhvGXivAkvDeR3hvAfeKMvFA9jyLqi5F1T1BwEacDCY8wcF1QHA9U9OcDAcDBjy5wPVGHA9U9ScDGHAwY8ucD1R2Gw3i3R7XyOrW/ssD+U9IcF1QHAyaY9bS2jRYAiqljxYA+kE3EmXHUvtU9dffPFHAjhGHADhIuPeLtCj9rT9dffHDaNH7an66e+Z8cB1RjYDqgxo42nQ+2p/eJ744bUw/29L7xPfMzbAdUjbAdUaY1Ndp4f7el94nvko2jQ+2p+unvmUYbZmd1W29gPbqZevs0JvYSWmPdPj8OwKtVpFWBBVnQggixBF9RaVGx9mbNwbl8P4lGK5C3jcxy3va7uba2vxsOE8s1JB9YRjLT8oSaY0YbWw/29L7xPfEduYUb8TRHbVT3zNiiH6wlLtXZ4D3A0YA/l+Us6XGx/vDgx/wBVQ+9T4o795cF53h/vk+KYWcH1QHB9UumN1/ejA+eYf75Pii/evAeeYf75PimE8k6o04TqjTG8jwuwHnmH++T3x48MMB57h/vU98wLkcHI40x6z5W/CPD41qNLCv4xaWdnqr9As4UBUP1rBbkjTUWO+2c+JlwcHAcHGmKjxMXipbckg5LGmKrxUXipZnCxcmPCNMVniovFSz5NFyeNMVvi4pY8ngjTG2ckHCNOEHCWthGlVhVUcKOEY2FHCW5VZGyLBioOFHCMOFHCW5RY0osi4qDhRwjDhxwluyrG+LXhJpinNEcIDRHCW5ReEBReEaYpzRHCNNAcJbGmsBppwjVxTNQHCNNEcJbsiRmVJNMR7EwIZy5GiA97XA9l4zaGB1Npf7ORVTm2NySba67reyQ4mneaY6+XicRs8E6icVTZYO4kT2VXDX6JA2D6pMHkqOxzfeZfYvZRFAMurJqetTv7tD3yypYW3RLOithru6b7rRhKz4oeHsjcn9WX7UaWZhTYMoYgMpuN+ovxBuPRAaKcJnXWcqMU+qFaS8Jc8nSI0E4Rq+KpGFUw8jWWZpLwjSijfJp4q3kYgODEsCBHWWNXFWcGIw4QS2OWAhY08VQcGOHsg5F1CWxyRZljTxUxwg4RpwY4S6LJGkpwMaeKm5GOEUuOZwijU8Xvcx6YjAR1yNgeM6uRxbtjLmAg8Ywk8ZAT2zt2XhVdmLnmqNdctydAL984CTxlnVHi6aUzcF+e9hcgfVFu71YV38iw3FPvD8UQ2dhjuKeiofilW2XTnsP8HH0xi4kqSb3Xoutj3dtu+NSe63/ZOG/q/eN7419mYYAMWUKdzGobHsN5UrjUy3Ny4OiOAVPE3742vjC1rIvoAPsk36XPtbVdl4ZRdtB5Rcgd95Vbew1GkilN7vlUqxYGyljv7J24nEAooZVYkXKkWI0379J5/wAK3ZXw9MG2Sk7t/adlAP8AkfvjTKhFFjqAbRrUG4Geh2IhNAcSNGsdLqLG3bJsl7Ja3iypIN7uoTQjptmI14qRHieTxGN2bnOYpzrWzLo3rDWUOKwOIB5oqW/tP75qiuNKjDQhFI8ixOfN0aGwPC0YaOhpG2ZgGLkaNdznVeByjo3XBjxPP6ZQuCxHSKnpZvfE2Cr+S/ex/Oau2vPyXyZh4oDn5r5VbTeChJsehgYmUC5UgmoDkq2ui/Zi246sbcZPD7X1Ppk6YKuTqr9xlrQ2aStnS994YX9hmieKBugWwQklDe7qVDAod9s7W7VIhDrpUZdLgWtbxd15+fsI1vul8ftPP6eFTCsoAAIA3AAAR/iH4Ge4RCpCGwdsjNUI5tQgFXVV+qcqA2HG8CgZbhCQgAFHXOGRyFa+83UA2O8R4r5vDvTcb/bItemem8LbZEdACDexU6EaWPtnmBWMz1MrfPWwiO2Ar1md/g6KdesadTN9AlcrWuQRp3X7p65dgYbyD67++Jzal6kZ8afWYik9ntfwdppTd6eYMilrFrgganfruvPI5usSWWLOpUGWNyGdGYcR+vRFm6xIrnKHhAVMnuOMae2Qc+Q8YsrSY24xjNwPtgR+LbrihzN1RQNCLxpeQtVjTUndxSl4xnkbVJGXkV37OpeMqKp3DnN2D3mw9MusTst3YuXAvuGugtoJ4Lbe38VgwrYREcubOKilrKBpYgi2plR84W1fN6XqP8UbDK1EbDYjVwe28dT2NmBDHTd0i9jvHdMr+cPanm9L1W+KI/KHtPpw9L1X+KTYZWnNsBAwF9Dc7twHEk/l0xz7IoqucAso1AQsxY3G4X13frfMpqfKDjz9LD0fSH+KN+cTHdNGj3P8UmzVzrGuPs+nYnMbgBit9bHoI6L33TwPhJis2Krm/wBEIg7FQN/qdpR0/lExl/5ij1/TH5zloYx6hapUPPdmdrCwuxvoOEm5GpzbfdpmE2jTpURZ0LD6mbU863R1H2Q8upjIorKWsA9a+pCMpytr9a7dPGZJyFL7ouQpwl809L7a4mNolnUugQZhkuMrl8rl9/EsO28VPHUmz5qqhg7hHJuVDKACuu6ZFyJOEY2HQdEeovpfbZuV0bgiugNwXNxz7KVsdew+iNTEYcaeNTIAgWncWQoSQw1617MomN+ITh7BF4hOHsEeoel9tfxGMpqjMtZWcKbODziM2YKNfRH4nGUQOa6FSSHpgizCoyqzHXouT16zHhRTh7JIuGThHqHpfbW6mOQPo6PvZCz5AllVCqtrqbk+kx+Bx6BDndM6gKzB/plVBDA9dz6bzIjhU4QclXhHqJ6X20fb9damGsuRQLMFR8zDptlsLameNB65WJQUG4vOkPM9da3zzh6404SvSxABZUe7qu8oylHsOk5WJHWBNRwHhDhMQoaniKbDQ2LqrD+0jEMp6iJlFchhYyBcFTP0kB7Zee8Tr8crW9r7fwyI6eORndGVaaOrOSwIHNBJA6zPAm0qsPg6aEFVAtwlhnHGTrrV54xNbrgv1yIsIA44zOriXNFmjFHCJl6o0wSw3GNCjgIDCuvT7JNMG0UXi+v9d8UaY91GkRRTu4msI0iKKFQVFvIjREUUKY1ASCpQFt0UUzVVOLw6cJW1MOvARRTNbiM0k4DukgdRoPzhikaNZxBn64ooAZuuc7sOPsiikDS1oA0UUB2e3TJUrW//ACKKBLyo9XdGHEDp9giigoePhziCKA7NvtJaOvTFFA7KdHjJRRiigI0o3JaKKEEIeMQBhikCKwFIopRHlhiigf/Z",
      },
    ],
    reviews: [],
  },
];

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);



  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <Fragment>
      <MetaData title="ECOMMERCE" />

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {productList?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Fragment>
    //   )}
    // </Fragment>
  );
};

export default Home;
