import subprocess

def run_command(command):
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True)
    return result.stdout

output = run_command("mkdir ~/newfolder && touch ~/newfolder/file1.txt")
print(output)
