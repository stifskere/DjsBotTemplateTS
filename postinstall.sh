if ! test -f ./.env; then
  touch ./.env; # so it doesn't fuck up encoding.
  echo -e "TOKEN=\"\"\nAPPID=\"\"" >> ./.env;

  echo -e "\x1b[1;31mIMPORTANT: DO FILL THE .env FILE AS SPECIFIED IN THE README.\x1b[0m"
fi