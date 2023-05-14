# import paramiko
import subprocess

hostname = '<driver-node_hostname>'
username = 'ec2-user'
key_file = 'project.pem'

commands = [
    ['scp', '-i', 'project.pem', 'requirements.txt','IPL_Data_Analysis.py', f'ec2-user@{hostname}:~/'],
]

print("Point 1")
# for cmd in commands:
#     result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)   
# ssh_client = paramiko.SSHClient()
# ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# ssh_client.connect(hostname=hostname, username=username, key_filename=key_file)
# stdin, stdout, stderr = ssh_client.exec_command('pip install -r requirements.txt')
# output = stdout.read()
# ssh_client.close()