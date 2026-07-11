with open("src/pages/account/index.tsx", "r") as f:
    c = f.read()

c = c.replace("""import { authStore, selectUser } from '../../stores/auth-store';""", """import { authStore, selectUser } from '../../stores/auth-store';
import { AccountTabs } from '../../components/AccountTabs';""")

c = c.replace("""    <div className="max-w-7xl mx-auto w-full flex-1">
      {/* Header Section */}
      <section className="mb-16 md:mb-24">""", """    <div className="max-w-7xl mx-auto w-full flex-1">
      <AccountTabs />
      {/* Header Section */}
      <section className="mb-16 md:mb-24">""")

with open("src/pages/account/index.tsx", "w") as f:
    f.write(c)

