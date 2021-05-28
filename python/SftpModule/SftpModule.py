import paramiko

class SftpModule:
    host = ""
    username = ""
    password = ""
    key_filename = ""
    ssh = ""
    sftp = ""

    def __init__(self,host,username,password,key_filename):
        self.host = host
        self.username = username
        self.password = password
        self.key_filename = key_filename

    def connect(self):
        condition = False
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy)
        try:
            self.ssh.connect(
                self.host,
                username=self.username,
                password=self.password,
                key_filename=self.key_filename
            )
            condition = True
        except Exception as e:
            print("TAGS :::: ", e)

        return condition

    def getSFTP(self):
        self.sftp = self.ssh.open_sftp()
        return self.sftp

    def getSSH(self):
        return self.ssh

    def disconnect(self):
        try:
            self.ssh.close()
            self.sftp.clocs()
        except Exception as e:
            print(e)
