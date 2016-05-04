Vagrant.configure(2) do |config|
  config.vm.box = "fedora/23-cloud-base"
  config.vm.define :vagrant_player do |vagrant_host|
    vagrant_host.vm.synced_folder "/home/lwhite/loc-projects", "/mnt/host-projects", type: "nfs"
    vagrant_host.vm.network "forwarded_port", guest: 3000, host: 3000

    
    vagrant_host.vm.provision "shell", inline: "sudo dnf install -y nodejs npm "
    vagrant_host.vm.provision "shell", inline: "ln -sf /mnt/host-projects/player-cert /home/vagrant/ || :"
    vagrant_host.vm.provision "shell", inline: "mkdir /home/vagrant/player-cert/src/player-cert/data || :"
    vagrant_host.vm.provision "shell", inline: "touch  /home/vagrant/player-cert/src/player-cert/data/player-cert.db"
    vagrant_host.vm.provision "shell", inline: "chown -R vagrant:vagrant /home/vagrant/player-cert/src/player-cert/"
    end
end
