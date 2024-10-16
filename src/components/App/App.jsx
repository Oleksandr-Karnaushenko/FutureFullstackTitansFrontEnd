import './App.css';
import SharedLayout from "../SharedLayout/SharedLayout";
import { Suspense } from "react";

const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));

export default function App() {
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
        <SharedLayout>
        </SharedLayout>
      </Suspense>
    </div>
  );
}
