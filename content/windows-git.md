### **Installing Git on Windows (Step-by-Step Guide)**

### **1. Download and Install Git**

1. Download Git from:
**https://git-scm.com/download/win**
2. Run the installer and follow these recommended settings:
    - **Use Git from the Windows Command Prompt**
    - **Use OpenSSH**
    - **Use Windows' default credential manager**
    - Leave everything else as default and finish the installation.

---

### **2. Add Git to the System Path (if needed)**

If `git --version` doesn't work in **Command Prompt** or **PowerShell**, follow these steps:

1. **Open Windows Settings**:
    - Right-click on the **Windows Start Menu** and select **Settings**.
2. **Find Advanced System Settings**:
    - Go to **System** → **About** → **Advanced system settings**.
3. **Edit Environment Variables**:
    - In the **Advanced** tab, click **Environment Variables** (bottom of the window).
    - Under **System Variables**, find and **double-click** `Path`.
4. **Add Git's Path**:
    - Click **New** and enter:
        ```
        C:\Program Files\Git\cmd
        ```
    - (Your exact path may vary depending on where Git was installed.)
5. **Save and Apply**:
    - Click **OK** on all windows to save the changes.
    - Restart your computer to apply the changes.

---

### **3. Verify Installation**

1. Open **Command Prompt** (Win + R, type `cmd`, press Enter).
2. Run: `git --version`
3. ✅ If you see a version number, Git is successfully installed! 